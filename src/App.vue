<template>
    <div>
    <div class="container">
        <input type="text" v-model.trim="inputCountry" >
        <button class="btn btn-primary" @click="findCountry">Find</button>
    </div>
    <hr>
    <div class="panel panel-default">
        <div class="panel-heading" v-if="searchCountry != ''">{{searchCountry}} is bordered by the following countries: </div>
        <hr>
         <div>
            <ul class="list-group panel-body">
                <li class="list-group-item" v-for="country in countryNames">{{country}}</li>
            </ul>
         </div>
        </div>
    </div>

    
   
</template>

<script>
    export default {
        data() {
            return {
                inputCountry: '',
                noBorders: false,
                borderingCountries: [],
                countryNames: [],
                countryFound: false,
                searchCountry: ''
            }
        },
        methods: {
            findCountry() {
                this.countryNames = [];
                this.searchCountry = '';
                this.$http.get(`https://restcountries.eu/rest/v2/name/${this.inputCountry}`)
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        if(!data) {
                            alert(`Country ${this.inputCountry} not found`);
                        }else {
                            this.searchCountry = data[0].name;
                        }
                        if(data) {
                            if (this.inputCountry.toLowerCase() != data[0].name.toLowerCase()) {
                                var choice = confirm(`${this.inputCountry} is the code for ${this.searchCountry}. Continue?`);
                                if (choice == false) {
                                    this.inputCountry = '';
                                    this.countryNames = [];
                                    this.searchCountry = '';
                                    reload();
                                } 
                     }                         
                     }
                        this.borderingCountries = data.map((country) => country.borders)[0]
                    }).then(countrynames => {
                        this.borderingCountries.forEach( (country) => {
                            this.$http.get(`https://restcountries.eu/rest/v2/alpha/${country}`)
                            .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            this.countryNames.push(data.name);
                        })
                        })
                        
                    })
                     .catch((e) => {
                        if(e.status === 404) {
                        console.log('Could not find country');
                        alert(`Could not find country ${this.inputCountry}`)
                        } else {
                        console.log(e.message);}
                    })
            }
}}

</script>


// .then (test => {
//                         this.$http.get(`https://restcountries.eu/rest/v2/name/Spain`)
//                         .then(response => {
//                             return response.json();       
//                     }).then(data => {
//                         this.borderingCountries = data.map((country) => country.borders)[0]
//                         console.log(this.borderingCountries);
//                     }) */