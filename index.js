const express = require('express');
const app = express();

const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://carlosdiazgirol.github.io/dashboard/'

//traernos todos los datos de la web a scrapear
app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if (response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)  //para que nos cargue el contenido

//nos traemos de DOM el titulo de la pagina
            const pageTitle = $('title').text()

//traernos los links
            const links = []
            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

//traernos las imagenes
            const imgs = []
            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })            

//pintamos en la respuesta los datos que nos interesan
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Links</h2>
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                <h2>Imágenes</h2>
                <ul>
                    ${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                </ul>
                `)
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('Server escuchando en puerto: http://localhost:3000')
})