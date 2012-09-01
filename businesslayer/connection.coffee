tedious = require('tedious')
Connection = tedious.Connection
TYPES = tedious.TYPES
Request = tedious.Request

helper = require('./helper')
logger = require('./logger').glgLogger

# config = { userName: process.env.DATABASE_GLGLIVE_USER, password: process.env.DATABASE_GLGLIVE_PASSWORD, server: process.env.DATABASE_GLGLIVE_SERVER, options: { port : process.env.SQL_PORT }}
config = { userName: sa, password: sa, server: 192.168.1.102, options: { port : 1433 }}

exports.ExecuteSql = (templateName, req, callback) ->
	# console.log config
	helper.GetSqlTemplate templateName, (err, mustacheTemplate) ->
		# console.log req.__data
		sqlQuery = mustacheTemplate.render(req.__data)
		connection = new Connection(config)
		connection.on 'connect', (err) ->
			if err
				# use comma wiht logger?
				logger.log "error while connecting sql server " + err
			else
				resultSet = []

				request = new Request sqlQuery, (err, rowCount) ->
					#console.log 'sqlQuery: ', sqlQuery
					if err
						logger.log err
						console.log err
					connection.close()

				request.on 'row', (columns) ->
					row={}

					columns.forEach (column) ->
						columnName = column.metadata.colName
						
						if column.isNull
							row[columnName] = null
						else
							row[columnName] = column.value
					resultSet.push row

					
				request.on 'doneInProc', (rowCount, more) ->
					# console.log '@@@@@@@@@@@@@@@@@@@@@@@@@@@'
					# console.log resultSet
					callback null, resultSet

			# console.log 'sqlParams: ' , req.__data
			for param,value of req.__data
				dataType = value?.dataType
				val = value?.value
				if !val? then val=value
				if !dataType?
					if !value? #tedious unable to handle null
						dataType='VarChar'
						val = null
					else
						switch typeof value
							when "number" then dataType='Int'
							when "string" then dataType='VarChar'
							when "boolean" then dataType='Bit' 
							when "object"
								if val instanceof Date
									dataType='DateTime'
								else
									#TODO : log only in debug mode
									#console.log "Object not supported in tedious for ", param
									# throw "Object not supported in tedious." 
							else throw "Cannot determine dataType of parameter " + param.toString()
				
				if dataType
					request.addParameter(param,TYPES[dataType],val)
				#console.log param, val
			connection.execSql(request)