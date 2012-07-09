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
    system("Ctrl + c")
    #system("Ctrl + c")
    system("foreman start -f Procfile.dev")
end
