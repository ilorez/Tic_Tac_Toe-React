persons =[
    {
        name:'yassine bouba',
        age:'20',
        languges:'Infinity'
    },
    {
        name:'abdesamad zalmadi',
        age:'22',
        languges:'Infinity'
    },
    {
        name:'hamza wahmane',
        age:'21',
        languges:'c '
    },
    {
        name:'zobair najdaoui',
        age:'20',
        languges:''
    }
]

persons.forEach(person => {
    return person.languges.includes('c ') ? console.log(`${person.name} go fuck your self `):console.log(`${person.name} you welcome `)
        
    
});