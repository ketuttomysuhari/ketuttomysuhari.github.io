    // Prepare the data
    const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const publications = [1, 3, 0, 1, 1, 1, 7];
    const hIndex = 3;

    // Create the chart
    const ctx = document.getElementById('publicationChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Publications per Year',
            data: publications,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointRadius: 5,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stepSize: 1
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Scopus Publications (H-index: ${hIndex})`
          }
        },
        animation: {
          delay: (context) => context.dataIndex * 100, // Delay animation based on data index
          duration: 1000, // Animation duration in milliseconds
          easing: 'easeInOutQuart' // Animation easing function
        }
      }
    });