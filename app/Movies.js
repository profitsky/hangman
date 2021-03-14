export class Movies{

  constructor()
  {
    this.properties = this.getMovie();
    this.indexes = [];
    this.lettersArr = this.properties.title.replace(/\s/g, '').toUpperCase();   
    this.limit = 6;
  };

    movieTitles =[
        {
            title: "Castaway",
            category: "survival drama",
            emojis: "&#127965 &#127796 &#127952"
        },

        {
            title: "The Sixth Sense",
            category: "psychological thriller",
            emojis: "&#128066 &#128067 &#128069 &#9995 &#128064 &#54"
        },
       
        {
            title: "Blood Diamond",
            category: "political war thriller",
            emojis: "&#129656 &#128142"
        },

        {
            title: "Psycho",
            category: "psychological horror",
            emojis: "&#128705 &#128298"
        },

        {
            title: "Blade Runner",
            category: "sci-fi",
            emojis: "&#128298 &#127939"
        },
       
        {
            title: "Finding Nemo",
            category: "cartoon",
            emojis: "&#128269 &#128032"
        },       

        {
            title: "Casino Royale",
            category: "action",
            emojis: "&#127922 &#128081"
        },

        {
            title: "Trainspotting",
            category: "comedy-drama",
            emojis: "&#128645 &#128064"
        },

        {
            title: "Fight Club",
            category: "drama",
            emojis: "&#9827 &#129354"
        },
        
        {
            title: "Oceans eleven",
            category: "comedy",
            emojis: "&#127754 &#128104 &#128104 &#128104 &#128104 &#128104 &#128104 &#128104 &#128104 &#128104 &#128104 &#128104"
        },
        
        {
            title: "Home alone",
            category: "comedy",
            emojis: "&#128102 &#127968 &#128176 &#128104 &#128104"
        },

        {
            title: "kung fu panda",
            category: "cartoon",
            emojis: "&#128074 &#128060 &#129355"
        },
        
        {
            title: "gravity",
            category: "scf thriller",
            emojis: "&#128640 &#11088 &#128105 &#127757"
        },
    ];


    getMovie()
    {
      let index = Math.floor((Math.random()*this.movieTitles.length));
      let movie = this.movieTitles[index];

      return movie;
    };

    getLetterIndexes(letter, title)
    { 
        let index = -1;        
        Array.from(title).forEach(char => {
        index++
            if(char === letter)
            {
            this.indexes.push(index)                
            }  
        });
    }
};