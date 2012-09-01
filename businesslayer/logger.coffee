# This will allow us to share logger across modules
util = require('util')
events = require('events')

# logger constructor
logger = ->
	events.EventEmitter.call(this)
	return

util.inherits(logger, events.EventEmitter)

logger.prototype.log = (errorMessage) ->
	this.emit( 'logError', errorMessage )
	return

glgLogger = new logger()

#TODO log error to file
glgLogger.on "logError", (errorMessage) ->
	console.log errorMessage	
	return

exports.glgLogger = glgLogger
