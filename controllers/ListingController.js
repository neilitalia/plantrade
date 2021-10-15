const { Listing, Image, User } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const GetAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: {
        model: Image,
        as: 'image_listing'
      },
      order: [['createdAt', 'DESC']]
    })
    return res.send(listings)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetPopularListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: {
        model: Image,
        as: 'image_listing'
      },
      order: [['views', 'DESC']]
    })
    return res.send(listings)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const GetListingById = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      where : { id: req.params.listing_id },
      include: [{
        model: User,
        as: 'listing_owner',
        attributes: {
          exclude: ['password_digest']
        }
      },{
        model: Image,
        as: 'image_listing'
      }]
    })
    // const listing = await Listing.findByPk(req.params.listing_id)
    if(listing){
      Listing.increment(
        { views: +1 },
        { where: { id: req.params.listing_id}}
      )
      return res.send(listing)
    }
    return res.status(400).send({ error: 'No Listing Found' })
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const CreateListing = async (req, res) => {
  try {
    // TODO: Verify user in listing
    const listing = req.body.listing
    if(listing.title && listing.price && listing.plant && listing.quantity > 1 && listing.description){
      const newListing = await Listing.create({ ...req.body.listing, views: 0 })
      return res.send(newListing)
    }
    res.status(400).send({ error: "Incomplete Fields" })
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const UpdateListing = async (req, res) => {
  try {
    const listing = req.body.listing
    const updatedListing = await Listing.update(
      { ...listing },
      { where: { id: req.params.listing_id },
        returning: true
      })
    return res.send(updatedListing)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const ArchiveListing = async (req, res) => {
  try {
    const listing = await Listing.update(
      { quantity: 0 },
      { where: { id: req.params.listing_id },
        returning: true
      })
    return res.send(listing)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const DeleteListing = async (req, res) => {
  try {
    const deletedListing = await Listing.destroy({
      where: { id: req.params.listing_id },
      returning: true
    })
    return res.send({ msg: "Deleted listing", delete: deletedListing})
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

const SearchForListing = async (req, res) => {
  try {
    const query = req.body.query
    const results = await Listing.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { plant: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } }
        ]
      }
    })
    return res.send(results)
  } catch (error) {
    return res.status(500).send({ error: error })
  }
}

module.exports = {
  GetAllListings,
  GetPopularListings,
  GetListingById,
  CreateListing,
  UpdateListing,
  ArchiveListing,
  DeleteListing,
  SearchForListing
}