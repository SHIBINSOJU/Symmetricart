const Product = require('../models/Product');
const Search = require('../models/Search');

exports.getHomepage = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(10);
        res.render('home', { products });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};

exports.getSearch = async (req, res) => {
    try {
        const searchTerm = req.query.term;
        const products = await Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { tags: { $regex: searchTerm, $options: 'i' } }
            ]
        });
        // Save search term
        const search = await Search.findOne({ term: searchTerm });
        if (search) {
            search.searchCount++;
            await search.save();
        } else {
            const newSearch = new Search({ term: searchTerm });
            await newSearch.save();
        }
        res.render('search_results', { products, searchTerm });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
};
