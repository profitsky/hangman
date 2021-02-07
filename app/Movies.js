export class Movies{

  constructor()
  {
    this.properties = this.getMovie();

  };

  
  




    movieTitles =[
        {
            title: "Intouchables",
            category: "drama",
        },

          {
            title: "The Green Mile",
            category: "drama",
        },

          {
            title: "Forrest Gump",
            category: "drama",
        },

          {
            title: "The Prestige",
            category: "thriller",
        },

          {
            title: "The Notebook",
            category: "melodrama",
        },

    ];


    getMovie()
    {
      let index = Math.floor((Math.random()*this.movieTitles.length));
      let movie = this.movieTitles[index];

      return movie;
    }

};