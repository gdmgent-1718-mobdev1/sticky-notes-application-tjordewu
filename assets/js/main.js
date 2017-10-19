function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() { //dom manipulatie
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.testApplicationDbContext(); // Test DbContext

        
               
             var stickyNotes = this._applicationDbContext.getStickyNotes();
             var resultsElement = document.querySelector('.results');
             if (stickyNotes === null) {
                 resultsElement.innerHTML += "<h4>Voeg sticky notes toe !! </h4>";
             }
             else {
                stickyNotes.forEach(function (element) {
                    resultsElement.innerHTML +=
                        `
                            <div class="stickyNoteResult">
                                <div class="stickyNoteContent">
                                    <span class="text">${element.message}</br></span>
                                    <span class="id">ID : ${element.id}</br></span>
                                    <form>
                                        <button class="btn deleteNote" id="${element.id}">Verwijderen</button> 
                                        <button class=" btn updateNote" id="${element.id}" data="${element.message}">Update</button>
                                    </form>
                                </div>
                            </div>
                       
                    `;
                 }, this);
             }
            
       // AddStickyNote
            
            document.getElementById("make").addEventListener("click", createStickyNote);
            
            function createStickyNote() {
                var value = document.getElementById("createStickyNoteValue").value;
               
                    var newNote = new StickyNote();
                    newNote.message = value;
                    ApplicationDbContext.addStickyNote(newNote);
                

            }

        // DeleteStickyNote 
            
            var deleteNote = document.querySelectorAll('.deleteNote');
            for (var i = 0; i < deleteNote.length; i++) {
                deleteNote[i].addEventListener('click', function (event) {
                    
                    var id = parseInt(this.id);
                    ApplicationDbContext.deleteStickyNoteById(id);
                });
            }

        // UpdateStickyNoteById
           
            var updateNote = document.querySelectorAll('.updateNote');
            for (var i = 0; i < updateNote.length; i++) {
                updateNote[i].addEventListener('click', function (event) {
                    
                         var message = prompt("", "Vul nieuwe tekst in");
                    
                        var id = parseInt(this.id);
                        sn = ApplicationDbContext.getStickyNoteById(id);
                        sn.message = message;
                        ApplicationDbContext.updateStickyNote(sn);
                    
                });
            }

        /*clearStickyNotes werkt nog niet
            var clearAll = document.querySelectorAll('clear');
        document.getElementsByClassName("clear").addEventListener("click", clearAll);
        ApplicationDbContext.clearAll();*/


        
        

           
            
        },
        "testApplicationDbContext": function() {
            // 1. Get all sticky notes
           // let data = this._applicationDbContext.getStickyNotes();
            //console.log(data);
            // 2. Create a new sticky note
            //let sn = new StickyNote();
            //sn.message = 'Pak cola zero voor mezelf.';
           // sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
            // 3. Get allesticky notes
            //data = this._applicationDbContext.getStickyNotes();
            //console.log(data);
            // 4. Get sticky note by id
            //sn = this._applicationDbContext.getStickyNoteById(2306155430445);
            //console.log(sn);
            // 5. Delete sticky note by id
            //const deleted = this._applicationDbContext.deleteStickyNoteById(2306155430445);
            //console.log(deleted);
            // 6. Soft Delete sticky note with id: 1551637732407
            //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
            //console.log(softDeleted);
            //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);
            // 6. Soft Delete sticky note with id: 1551637732407
            //const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(1551637732407);
            //console.log(softUnDeleted);
            //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);
            // Update sticky note with id: 1902577181167
            //sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            //console.log(sn);
            //sn.message = 'ik heb zin in een zwarte kat (koffie)...';
            //const updated = this._applicationDbContext.updateStickyNote(1902577181167);
            //console.log(updated);
            //sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            //console.log(sn);
        }
    };

    App.init(); // Initialize the application
});
