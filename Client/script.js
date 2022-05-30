const labels = ['10K', '100K', '200K', '500K', '1000K'];

/*
const data = {
  labels: labels,
  datasets: [{
    label: 'Redis',
    data: redisData,
    borderColor: '#4BC0C0',
    tension: 0.15
  }, {
    label: 'MSSQL',
    borderColor: '#F9777B',
    data: mssqlData,
  }]
};
*/

function drawNewChart(redisData, mssqlData) {
  const oldCanvas = document.getElementById('chart');
  if(oldCanvas !== null) {
    oldCanvas.remove();
  }

  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'chart');

  const data = {
    labels: labels,
    datasets: [{
      label: 'Redis',
      data: redisData,
      borderColor: '#4BC0C0',
      tension: 0.15
    }, {
      label: 'MSSQL',
      data: mssqlData,
      borderColor: '#F9777B',
      data: mssqlData,
    }]
  };

  const myChart = new Chart(canvas, {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
  });

  document.querySelector('.container').appendChild(canvas);
}

const form = document.querySelector('form');
form.addEventListener('submit', async(event) => {
  event.preventDefault();

  const queryType = document.getElementById('query-type').value;

  const url = `http://localhost:8000/${queryType}-query`;
  const options = {
    method: 'GET'
  };
  
  const getTimes = async() => {
    try {
      const message = await fetch(url, options)
      .then(response => response.json())
      .catch(error => console.log(error));
      return message.ExecutionTimes;
    } catch(error) {
      console.error('ERROR: ', error);
    }
  }

  let [redisData, mssqlData] = await getTimes();

  drawNewChart(redisData, mssqlData);
});
