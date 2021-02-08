const fixtures = {
    data: [
        {
            fifaId: 9000011,
            date: "2021-02-05 17:25:00",
            homeTeam: {
                shortCode: "CAC",
                id: 9011,
                name: "CodeAcademy",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_aQfsuiK8TWF0OiINNemy6f7D0H5SS3t7TA&usqp=CAU"
            },
            awayTeam: {
                shortCode: "UDM",
                id: 9012,
                name: "Udemy",
                img: "https://www.pipelinersales.com/wp-content/uploads/2019/06/large-udemy.jpg"
            },
            status: 0,
            statusName: "Notstarted",
            league: {
                countryName: "Lithuania",
                id: 9011,
                name: "Programuotojų lyga"
            },
            // scores: {
            //     home_score: "0",
            //     away_score: "0",
            // }
        },

        {
            fifaId: 9000012,
            date: "2021-02-05 17:23:00",
            homeTeam: {
                id: 9013,
                name: "Verbus Architects",
                img: "https://pbs.twimg.com/profile_images/3506410963/3451e83c5c603ad57cf7c692c630c060.png",
                shortCode: "VAR"
            },
            awayTeam: {
                id: 9014,
                name: "Sad Pandas",
                img: "https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/bb/34/f3/bb34f38d-b9f4-e3b7-907f-c46e293d8ec6/source/256x256bb.jpg",
                shortCode: "SPA"
            },
            status: 1,
            statusName: "Notstarted",
            league: {
                id: 9012,
                name: "Grinder Games",
                countryName: "Lithuania"
            },
            // scores: {
            //     home_score: "0",
            //     away_score: "0",
            // }
        },


        {
            fifaId: 9000013,
            "date": "2021-02-05 17:24:00",
            "homeTeam": {
                id: 9015,
                name: "Charlie Charlington",
                img: "https://img.icons8.com/cotton/2x/charlie-chaplin--v2.png",
                shortCode: "CCH"
            },
            awayTeam: {
                id: 9016,
                name: "Raging Racoons",
                img: "https://image.flaticon.com/icons/png/128/2298/2298415.png",
                shortCode: "RAC"
            },
            status: 0,
            status_name: "Notstarted",
            league: {
                id: 9013,
                name: "Dreamers League",
                countryName: "Denmark"
            },
            // scores: {
            //     home_score: "0",
            //     away_score: "0",
            // }
        },

    ]
}

export default fixtures;