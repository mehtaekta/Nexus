# Compile Less:
watch("less/.*\.less$") do |match|
    puts "updating less styles."
    system("lessc less/style.less > public/stylesheets/style.css")
    restart_foreman
end

#copy & restart function
def restart_foreman()
    puts "restart foreman"
    system("CTRL + C")
    system("CTRL + C")
    sleep 3
    system("foreman start -f Procfile.dev")
    puts "restart complete"
end
