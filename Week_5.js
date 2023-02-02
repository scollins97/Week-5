class Pet{
    constructor(name, petDescription){
        this.name = name;
        this.petDescription = petDescription;
    }

    describe() {
        return `${this.name} \n ${this.petDescription}`;
    }
}

class Family{
    constructor(name, pets){
        this.name = name;
        this.pets = [];
    }

    addPet(pet) {
        //checking to make sure element passed in is in fact a pet object
        if(pet instanceof Pet) {
            this.pets.push(pet);
        }else {
            throw new Error(`Sorry! You can only add an instance of Pet.  Argument is not a Pet: ${pet}`);
        }
    }

    describe() {
        return `The ${this.name} family has ${this.pets.length} pets.`;
    }
}

class Menu {
    constructor() {
        this.families = [];
        this.selectedFamily = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while(selection != 0) {
            switch (selection){
                case '1':
                    this.createFamily();
                    break;
                case '2':
                    this.viewFamily();
                    break;
                case '3':
                    this.deleteFamily();
                    break;
                case '4':
                    this.displayFamilies();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }
    //returns the users options when called
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new family
            2) view family
            3) delete family
            4) display all families`);
    }
    //returns the users family options when called
    showFamilyMenuOptions(family) {
        return prompt(`
        0) back
        1) create pet
        2) delete pet
        ------------------------`);
    }
    displayFamilies() {
        let familyString = ``;
        for(let i = 1; i <= this.families.length; i ++){
            familyString += i + ') ' + this.families[i-1].name + '\n';
        }
        alert(familyString);
    }
    createFamily() {
        let name = prompt('Enter name for the new family: ');
        this.families.push(new Family(name));
    }
    viewFamily() {
        let index = prompt('Enter the index of the family you want to look at:');
        if(index > -1 && index < this.families.length) {
            this.selectedFamily = this.families[index];
            let description = 'Family Name: ' + this.selectedFamily + '\n';

            for(let i = 0; i < this.selectedFamily.pets.length; i++) {
                description += i + ') ' + this.selectedFamily.pets[i].name + 
                    ' - ' + this.selectedFamily.pets[i].petDescription + '\n';
            }

            let selection = this.showFamilyMenuOptions(description);

            switch (selection){
                case '1':
                    this.createPet();
                    break;
                case '2':
                    this.deletePet();
            }
        }
    }
    deleteFamily() {
        let index = prompt('enter the index of the family you wish to delete');
        if(index > -1 && index < this.families.length) {
            this.families.splice(index, 1);
        }
    }
    createPet() {
        let name = prompt('enter the name for the new pet');
        let description = prompt(`please provide information about your pet such as: \nsex\ncolor\nbreed`);
        this.selectedFamily.pets.push(new Pet(name, description));
    }
    deletePet() {
        let index = prompt('enter the index of the pet you wish to delete');
        if(index > -1 && index < this.selectedFamily.pets.length) {
            this.selectedFamily.pets.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();