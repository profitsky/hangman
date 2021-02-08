export class Movies{

  constructor()
  {
    this.properties = this.getMovie();
    this.indexes = [];
  
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

    getLetterIndexes(letter, title)
    {
      
      let index = -1;
        
      Array.from(title).forEach(char => {

        index++

        if(char === letter || char === " ")
        {
           this.indexes.push(index)        
        }
        
      });          
    }

};