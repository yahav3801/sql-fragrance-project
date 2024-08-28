const { response } = require('express');
const companies = require('./companies');
const fs = require('fs');
module.exports = {
    message:'',
    getAddPage: (req,res)=>{

        companies.getCompaniesList((err,result)=>{
            if (err) {
                return res.status(500).send(err.message);
            }
            
        
        res.render('add-fragrance.ejs',{
            title: 'Add | Fragrance',
        message:module.exports.message,
        companies:result,
        hostingDir
    })
})
    },

    addFragrance: (req,res)=>{
        console.log(req.body);
        if (!req.files) {
            module.exports.message='No file was uploaded'
            return res.redirect('hostingDir/add')
        }
        let fragranceName= req.body.fragranceName;
        let designer= req.body.designer;
        let price= req.body.price;
        let mainAccords= req.body.mainAccords;
        let topNotes= req.body.topNotes;
        let middleNotes= req.body.middleNotes;
        let baseNotes= req.body.baseNotes;
        let image = req.files.image
        // console.log(`image.name: ${image.name}`);
        // console.log(`image.mimetype: ${image.mimetype}`);
        let extension = image.mimetype.split('/')[1];
        if (!/^(heic|gif|jpeg|png|webp|svg|jpg)$/.test(extension)) {
            module.exports.message= `Wrong file extension:${extension}`;
            return res.redirect('hostingDir/add');
        }
        let imageName = `${fragranceName}.${extension}`
        let querySQL = `SELECT * FROM designers WHERE name = '${fragranceName}'`;

        db.query(querySQL,(err,result)=>{
            if (err) {
                return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while performing\n
                    ${querySQL}</h1>`)
            }
            if (result.length > 0 ) {
                module.exports.message = `Fragrance '${fragranceName}' already exists`
                return res.redirect(`${hostingDir}/add`)
            }
            
            querySQL = `INSERT INTO designers (name, designer, main_accords, image, price, top_notes, middle_notes, base_notes)
                VALUES 
                ('${fragranceName}','${designer}','${mainAccords}','${imageName}',${price},'${topNotes}','${middleNotes}','${baseNotes}');`
            db.query(querySQL,(err,res)=>{
                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                        while performing\n
                        ${querySQL}</h1>`)
                }
                image.mv(`static/assets/img/${imageName}`,(err)=>{
                    if (err) {
                      return  console.error(err);
                        //t.b.d DELETE 
                    }
                })
            })
            res.redirect(`${hostingDir}/add`)
            
        })

    },getEditPage: (req, res) => {

        let fragranceId = req.params.id;

        companies.getCompaniesList((err,companies) => {

            if (err) {
                return res.status(500).send(err.message);
            }

            let querySQL = `SELECT * FROM designers
                   WHERE id = ${fragranceId}`;

            db.query(querySQL, (err,fragrances) => {

                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while on purpose to edit fragrance performing\n
                    ${querySQL}</h1>`);
                }

                res.render('edit-fragrance.ejs', {
                    title: 'Edit | Fragrance',
                    message: module.exports.message,
                    companies:companies,
                    fragrance: fragrances.length > 0 ? fragrances[0] : null
                })
            })

        })

    },editFragrance: (req, res) => {

        // Extract parameters from the request
        const fragranceId = req.params.id;
        const fragranceName = req.body.name;
        const designerId = +req.body.designer; // Convert to number
        const price = req.body.price;
        const mainAccords = +req.body.mainAccords; // Convert to number
        const topNotes = req.body.topNotes || null; // Default to null if not provided
        const middleNotes = req.body.middleNotes || null; // Default to null if not provided
        const baseNotes = req.body.baseNotes || null; // Default to null if not provided
    
        // SQL query to update the fragrance
        const querySQL = `UPDATE fragrances SET 
            name = ?,
            designer_id = ?,
            price = ?,
            main_accords = ?,
            top_notes = ?, 
            middle_notes = ?,
            base_notes = ?
            WHERE id = ?`;
    
        // Parameters for the SQL query
        const inputSQL = [fragranceName, designerId, price, mainAccords,
            topNotes, middleNotes, baseNotes, fragranceId];
    
        // Execute the query
        db.query(querySQL, inputSQL, (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send(`<h1>Internal Server Error</h1><p>${err.message}</p>`);
            }
    
            // Redirect to the home page or another appropriate route
            res.redirect('hostingDir/');
        });
    },
    editFragrance: (req, res) => {

        // Extract parameters from the request
        const fragranceId = +req.params.id;
        const fragranceName = req.body.name;
        const designerId = req.body.designer; // Convert to number
        const price = +req.body.price;
        const mainAccords = req.body.mainAccords; // Convert to number
        const topNotes = req.body.topNotes; // Default to null if not provided
        const middleNotes = req.body.middleNotes; // Default to null if not provided
        const baseNotes = req.body.baseNotes; // Default to null if not provided
    
        // SQL query to update the fragrance
        const querySQL = `UPDATE designers SET 
            name = ?,
            designer = ?,
            price = ?,
            main_accords = ?,
            top_notes = ?, 
            middle_notes = ?,
            base_notes = ?
            WHERE id = ?;`
    
        // Parameters for the SQL query
        const inputSQL = [fragranceName, designerId, price, mainAccords,
            topNotes, middleNotes, baseNotes, fragranceId];
    
        // Execute the query
        db.query(querySQL, inputSQL, (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send(`<h1>Internal Server Error</h1><p>${err.message}</p>`);
            }
    
            // Redirect to the home page or another appropriate route
            res.redirect('hostingDir/');
        });
    }, deleteFragrance: (req, res) => {

        let fragranceId = req.params.id;

        let querySQL = `SELECT * FROM designers WHERE id = ${fragranceId}`;

        db.query(querySQL,(err,fragrance) => {

            if (err) {
                return res.status(500).send(`<h1>ERROR ${err.message}\n
                while getting image name for DELETE and performing\n
                ${querySQL}</h1>`);
            }

            let imageName = fragrance[0].image;

            querySQL = `DELETE FROM designers WHERE id = ${fragranceId}`;
            
            db.query(querySQL,(err) => {
                
                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while performing\n
                    ${querySQL}</h1>`);
                }

                fs.unlink(`static/assets/img/${imageName}`,(err) => {

                    if (err) {
                        return res.status(500).send(`<h1>ERROR ${err.message}\n
                        while succeeded to perform\n
                        ${querySQL}\n
                        and failed to remove static/assets/img/${imageName}</h1>`);
                    }

                    res.redirect(`${hostingDir}/`);

                }) // end of deleting the image
                
            }) // end of db.query('DELETE ...')
            
        }) // end of db.query('SELECT IMAGE NAME ...')
    }
        
}
