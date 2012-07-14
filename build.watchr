# Copy Changed Files & Restart Stew
watch(".*") do |match|
    restart_foreman
end

# Compile Less:
watch("less/.*\.less$") do |match|
    puts "updating less styles."
    restart_foreman
end

# Compile Coffee:
watch(".*\.coffee") do |match|
    puts "compiling coffee."
    restart_foreman 
end


#copy & restart function
def restart_foreman()
    puts "restart foreman"
    #system("CTRL + C")
    #system("CTRL + C")
    proc_close()
    sleep 3
    system("foreman start -f Procfile.dev")
    puts "restart complete"
end
