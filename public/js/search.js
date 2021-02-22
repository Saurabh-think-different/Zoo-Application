const table = document.querySelector('.empsearchtable')
const tablebody = document.querySelector('tbody')

const inp = document.querySelector('input[name="empid"]')
const subBtn = document.querySelector('button.btn')


async function getEmpdata(){
    
    const empdata = await fetch('http://localhost:3000/emp_view') 
    const json = await empdata.json()

    json.forEach(emp => {
        const row = document.createElement('tr')
        Object.keys(emp).forEach((key) => {
          const td = document.createElement('td')
          let t = document.createTextNode(emp[key])
          
          td.appendChild(t)
          row.appendChild(td)
        });
        tablebody.appendChild(row)
      })
}

getEmpdata();