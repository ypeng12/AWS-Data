const express = require('express')
const path = require('path')
const { argv } = require('process')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')

// ----------- Set up .env, Database and Collection Name -----------
require('dotenv').config()
const name = process.env.MONGO_DB_USERNAME
const password = process.env.MONGO_DB_PASSWORD
const name_DB = process.env.MONGO_DB_NAME
const collectionName = process.env.MONGO_COLLECTION
const data_collection = {
	db: name_DB,
	collection: collectionName,
}

// ----------- Connect to MongoDB -----------
const uri = `mongodb+srv://${name}:${password}@cluster0.26cxh3i.mongodb.net/${name_DB}?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
	serverApi: ServerApiVersion.v1,
})

let db;

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        db = client.db(data_collection.db); 
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));


// ----------- Set up App -----------
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', '.ejs')

// App config
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// ------------------ ROUTES ------------------

// GET - home page
app.get('/', (req, res) => {
	res.render('home')
})

// Get - apply page
app.get('/index', (req, res) => {
	res.render('index')
})
// POST - applyResult page - Insert apply to DB
app.post('/indexR', async (req, res) => {

	const { name, address, grade, backIn } = req.body
	const now = new Date()
    // Basic validation (you can expand this as needed)
    if (!name || !address || isNaN(parseInt(grade))) {
        return res.status(400).send("Invalid input data");
    }

	try {
		await client.connect()

		const app_collection = db.collection(data_collection.collection);


		// Insert apply to DB
		await app_collection.insertOne({
			name: name,
			address: address,
			grade: parseInt(grade),
			backIn: backIn,
			date: new Date(),
		})

		await client.close()

		return res.render('indexR', {
			name: name,
			address: address,
			grade: parseInt(grade),
			backIn: backIn,
			date: new Date(),
		})
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while processing your request");
	}
})

// GET - review page
app.get('/review', (req, res) => {
	res.render('review')
})
// POST - reviewResult page
app.post('/reviewResult', async (req, res) => {
	const { address } = req.body
	if (!address) {
        return res.status(400).send("Address is required");
    }
	// const filter = { address: address }
		
	try {
		await client.connect()

        const app_collect = db.collection(data_collection.collection);

        const apply = await app_collect.findOne({ address });

		if (!apply) {
            return res.render('reviewResult', { 
                name: 'None', address: 'None', grade: 'None', backIn: 'None', date: 'None'
            });
        }

		await client.close()

		res.render('reviewResult', apply);

	} catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing your request");
	}
})

// GET - grade page
app.get('/grade', (req, res) => {
	res.render('grade')
})
// POST - gpaResult page - table of users with >= grade
app.post('/grade', async (req, res) => {
	const { grade } = req.body 
	const filter = { grade: { $gte: parseInt(grade) }}

	try {
		await client.connect()

		const app_collect = db.collection(data_collection.collection);
        const filter = { grade: { $gte: parseInt(grade) }};

        const applicants = await app_collect.find(filter).toArray();

		await client.close()

		res.render('gpaResult', { applicants })

	} catch (error) {
		console.error(error)
	}

})

// GET - remove page
app.get('/remove', (req, res) => {
	res.render('remove')
})
// POST - removeResult page
app.post('/remove', async (req, res) => {
	try {
		await client.connect()

		const data_collection = await db.collection(data_collection.collection).deleteMany({});

		await client.close()

		return res.render('removeResult', { data_collection: data_collection.deletedCount })

	} catch (error) {
		console.error(error)
	}
})

const PORT = argv[2] || 3000
app.listen(PORT)

// ------------------ USER INTERFACE ------------------
let data = ''
console.log(`Web server started and running at http://localhost:${PORT}`)
process.stdin.setEncoding('utf8')
process.stdout.write('Stop to shutdown the server: ')
process.stdin.on('readable', () => {
	data = process.stdin.read()
	if (data !== null) {
		let cmd = data.trim()
		if (cmd === 'stop') {
			console.log('Shutting down server')
			process.exit(0)
		}
	}
	process.stdout.resume()
})

module.exports = app