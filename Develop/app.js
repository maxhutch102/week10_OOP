const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


const team = [];
const ids = [];

function menu() {
    function createManager() {
        console.log("Welcome, Please Create Your Work Team Here.");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Please Enter Managers's Name."

            },
            {
                type: "input",
                name: "managerId",
                message: "Please Enter An ID Number."
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Please Enter An E-Mail Address."
            },
            {
                type: "input",
                name: "officeNumber",
                message: "Please Enter An Office Number"   
            }
        ]).then(res => {
            const manager = new Manager(res.managerName, res.managerId, res.managerEmail, res.officeNumber);
            team.push(manager);
            ids.push(res.managerId);
            createTeam();
        });
    };
    
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "teamChoice",
                message: "What type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Finished"

                ]
            }
        ]).then(choice => {
            switch (choice.teamChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
            
                default:
                    buildTeam();

                    break;
            }
        });
    };
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Please Enter Engineer's Name."
            },
            {
                type: "input",
                name: "engineerId",
                message: "Please Enter An ID."
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Please Enter An E-Mail Address"
            },
            {
                type: "input",
                name: "github",
                message: "Please Enter Your Github User Name"
            }
        ]).then(res => {
            const engineer = new Engineer(res.engineerName, res.engineerId, res.engineerEmail, res.github);
            team.push(engineer);
            ids.push(res.engineerId);
            createTeam();

        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Please Enter Intern's Name."
            },
            {
                type: "input",
                name: "internId",
                message: "Please Enter Intern's ID Number."
            },
            {
                type: "input",
                name: "internEmail",
                message: "Please Enter An E-Mail Address"
            },
            {
                type: "input",
                name: "school",
                message: "Please Enter Intern's School"
            }
        ]).then(res => {
            const intern = new Intern(res.internName, res.internId, res.internEmail, res.school);
            team.push(intern);
            ids.push(res.internId);
            createTeam();
        
        });

    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), "utf-8");

    }

    createManager();

};

menu();