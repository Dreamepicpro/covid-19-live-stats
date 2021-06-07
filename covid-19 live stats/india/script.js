let todaysData = [];
var x = document.getElementById("nav-div");

x.style.display = "none";
d3.json('https://api.covid19india.org/state_district_wise.json').then(data => {
    let totalConfirmed =0;
    let totalDeceased =0;
    let totalActive = 0;
    let totalRecovered = 0;
    let keys = Object.keys(data);
    let districtKeys = [];
    let subDistrictKeys = [];
    Object.keys(keys.map(d => districtKeys.push(data[d]['districtData'])));
    //keys.map(d => console.log(data[d]['districtData']));
    districtKeys.map(d => subDistrictKeys.push(Object.keys(d)));
    console.log(data[keys[1]]['districtData'][subDistrictKeys[1][1]]);
    for(let i=0; i<keys.length;i++){
      let confirmed =0;
      let deceased =0;
      let active = 0;
      let recovered = 0;
      let state = '';
      let temp = [];
      for(let j=0;j<subDistrictKeys[i].length;j++){
        active += +(data[keys[i]]['districtData'][subDistrictKeys[i][j]]['active']);
        deceased += +(data[keys[i]]['districtData'][subDistrictKeys[i][j]]['deceased']);
        confirmed += +(data[keys[i]]['districtData'][subDistrictKeys[i][j]]['confirmed']);
        recovered += +(data[keys[i]]['districtData'][subDistrictKeys[i][j]]['recovered']);
      }
      state = keys[i];
      todaysData.push({active : active , deceased : deceased, confirmed : confirmed, recovered : recovered , state : state});
      totalConfirmed += confirmed;
      totalDeceased += deceased;
      totalActive += active;
      totalRecovered += recovered;
    }
    console.log(todaysData);


  let index = 0;
  let sumElement = document.getElementById('sum-data-element');
  let listElement = document.getElementById('list-element');
  let navDiv = document.getElementById('nav-div');
  let districtElement = document.getElementById('district-element');
  
  let headConfirmed = document.createElement('UL');
  headConfirmed.appendChild(document.createTextNode('Total Confirmed : '+totalConfirmed));
  headConfirmed.appendChild(document.createElement('BR'));
  
  let headActive = document.createElement('UL');
  headActive.appendChild(document.createTextNode('Total Active : '+totalActive));
  headActive.appendChild(document.createElement('BR'));
  
  let headDeceased = document.createElement('UL');
  headDeceased.appendChild(document.createTextNode('Total Deceased : '+totalDeceased));
  headDeceased.appendChild(document.createElement('BR'));
  let headRecovered = document.createElement('UL');
  headRecovered.appendChild(document.createTextNode('Total Recovered : '+totalRecovered));
  headRecovered.appendChild(document.createElement('BR'));
  
  let sumDiv = document.createElement('DIV');
  sumDiv.id = "sum-div";
  
  sumDiv.appendChild(headConfirmed);
  sumDiv.appendChild(headActive);
  sumDiv.appendChild(headRecovered);
  sumDiv.appendChild(headDeceased);
  
  sumElement.appendChild(sumDiv);
  
  todaysData.forEach(d => {
      let listDiv = document.createElement('DIV');
      let node = document.createElement("LI"); 
      let textnode1 = document.createTextNode(keys[index]);
      let nodeDiv = document.createElement('DIV');
      let node2 = document.createElement("UL"); 
      let node3 = document.createElement("UL");
      let node4 = document.createElement("UL");
      let node5 = document.createElement("UL");

      let textNode2 = document.createTextNode(" Confirmed : "+d['confirmed']);
      let textNode3 = document.createTextNode(" Deaths : "+d['deceased']);
      let textNode4 = document.createTextNode(" Recovered : "+d['recovered']);
      let textNode5 = document.createTextNode(" Active : "+d['active']);

      
      node.className = "main-list";
      nodeDiv.className = "secondary-list";
      listDiv.id = d['state'];

      node.appendChild(textnode1);
      node2.appendChild(textNode2);
      node3.appendChild(textNode3);
      node4.appendChild(textNode4);
      node5.appendChild(textNode5);
      nodeDiv.appendChild(node2);
      nodeDiv.appendChild(node3);
      nodeDiv.appendChild(node4);
      nodeDiv.appendChild(node5);

      node.appendChild(nodeDiv);
      listDiv.appendChild(node);
      listDiv.appendChild(document.createElement('BR'));
      
      //Navigation
      let navnode = document.createElement('A');
      navnode.href=`#${d['state']}`;
      let navUl = document.createElement('UL');
      navUl.appendChild(document.createTextNode(`${d['state']}`));
      navnode.appendChild(navUl);
      navDiv.appendChild(navnode);

      listElement.appendChild(listDiv);
    index++;
    });

 

});

//console.log(listElement);

let index =0;

//d3.select('ul').data(todaysData).enter().append('text').text(d => d)

function myFunction() {
  let hr = document.getElementById('horizontal-row');
  if (x.style.display == "none") {
    x.style.display = "flex";
    hr.style.display = 'flex';
  } else {
    x.style.display = "none";
    hr.style.display = "none";
  }
}