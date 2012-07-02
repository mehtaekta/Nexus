# Copy Changed Files & Restart Stew
watch(".*") do |match|
    restart_foreman
end

# Compile Less:
watch("less/.*\.less$") do |match|
    puts "updating less styles."
    system("lessc less/style.less > public/css/style.css")
    #restart_foreman
end

# Compile Coffee:
watch(".*\.coffee") do |match|
    puts "compiling coffee."
    system("./node_modules/.bin/coffee --compile #{match}")
    restart_foreman 
end


#copy & restart function
def restart_foreman ()
    system("Ctrl + Break")
    system("Ctrl + Break")
    #puts "pausing for 3 seconds"
    #sleep 3

    #puts "starting stew."
    system("foreman start -f Procfile.dev")
end
