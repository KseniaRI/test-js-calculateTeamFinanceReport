const salaries1 = {
    Manager: { salary: 1000, tax: "10%" },
    Designer: { salary: 600, tax: "30%" },
    Artist: { salary: 1500, tax: "15%" },
};

const team1 = [
    { name: "Misha", specialization: "Manager" },
    { name: "Max", specialization: "Designer" },
    { name: "Vova", specialization: "Designer" },
    { name: "Leo", specialization: "Artist" },];

const salaries2 = {
    TeamLead: { salary: 1000, tax: "99%" },
    Architect: { salary: 9000, tax: "34%" },
};

const team2 = [
    { name: "Alexander", specialization: "TeamLead" },
    { name: "Gaudi", specialization: "Architect" },
    { name: "Koolhas", specialization: "Architect" },
    { name: "Foster", specialization: "Architect" },
    { name: "Napoleon", specialization: "General" },];

const teams = [
    {option: "1", salaries: salaries1, team: team1},
    {option: "2", salaries: salaries2, team: team2}
]


const option = document.getElementById('team');
const report = document.querySelector('.report');

option.addEventListener("change", onSelect);

function onSelect(evt){
    const numOfSelectedTeam = evt.target.value;
    const selectedTeam = teams.find(team => team.option === numOfSelectedTeam);
    renderTeamFinanceReport(selectedTeam.salaries, selectedTeam.team);
}

function renderTeamFinanceReport(salaries, team) {
    const financeReport = calculateTeamFinanceReport(salaries, team);
    console.log(Object.entries(financeReport))
    const markup = Object.entries(financeReport).map(total => {
        const item = total.join(": ")
        return `<li>${item}</li>`;
    }).join("")
    report.innerHTML = markup;
}

function calculateTeamSpecializations(team) {
  const specializations = team.map(employee => employee.specialization);
  let sp0 = specializations[0];
  let specializationsCalc = {
    [sp0]: 1,
  };

  for (let i = 1; i < team.length; i += 1) {
    if (specializations[i] === sp0) {
      specializationsCalc[sp0] += 1;
    } else {
      specializationsCalc[specializations[i]] = 1;
      sp0 = specializations[i];
    }
  }
  return specializationsCalc;
}

function calculateTeamFinanceReport(salaries, team) {
  const NumOfSpecializations = calculateTeamSpecializations(team);
  const specializations = Object.keys(salaries);
  let totalBudgets = {};
  let totalBudgetTeam = 0;
  totalBudgets['totalBudgetTeam'] = totalBudgetTeam;

  for (const specialization of specializations) {
    const specializationTotalBudget = salaries[specialization].salary * 100 * NumOfSpecializations[specialization] / (100 - Number.parseInt(salaries[specialization].tax));
    totalBudgetTeam += specializationTotalBudget;
    totalBudgets[`totalBudget${specialization}`] = Math.floor(specializationTotalBudget);
  }
  totalBudgets.totalBudgetTeam = Math.floor(totalBudgetTeam);
  
  return totalBudgets;
 }



// const financeReport1 = calculateTeamFinanceReport(salaries1, team1);
// console.log(JSON.stringify(financeReport1));

// const financeReport2 = calculateTeamFinanceReport(salaries2, team2)
// console.log(JSON.stringify(financeReport2));

