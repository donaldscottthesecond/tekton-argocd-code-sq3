const fs = require('fs');
const path = require('path');
const list_directory = path.join('./', 'grocery_lists');

function save_list(list_obj)
{
    const stringified_data = JSON.stringify(list_obj);
    const file_name = list_obj.list.groceryListName + ".gl";

    try
    {
        if (!fs.existsSync(list_directory))
            fs.mkdirSync(list_directory);

        fs.writeFileSync(path.join(list_directory, file_name), stringified_data);
        
        return (true);
    }
    catch(e)
    {
        console.log("Error writing file", file_name);

        return (false);
    }
}

function read_list(list_name)
{
    try
    {
        const file_name = list_name + ".gl";
        const list = fs.readFileSync(path.join(list_directory, file_name), "utf8");

        return (list);
    }
    catch(e)
    {
        console.log("Error", e.syscall, e.path);
        return (null);
    }
}

module.exports.save_list = save_list;
module.exports.read_list = read_list;
