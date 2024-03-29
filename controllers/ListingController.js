const { Listing, Image, User, CartListing } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const GetAllListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: {
        model: Image,
        as: "image_listing",
      },
      order: [["createdAt", "DESC"]],
    });
    return res.send(listings);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const GetPopularListings = async (req, res) => {
  try {
    const listings = await Listing.findAll({
      include: {
        model: Image,
        as: "image_listing",
      },
      order: [["views", "DESC"]],
    });
    return res.send(listings);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const GetListingById = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      where: { id: req.params.listing_id },
      include: [
        {
          model: User,
          as: "listing_owner",
          attributes: {
            exclude: ["password_digest"],
          },
        },
        {
          model: Image,
          as: "image_listing",
        },
      ],
    });
    if (listing) {
      Listing.increment(
        { views: +1 },
        { where: { id: req.params.listing_id } }
      );
      return res.send(listing);
    }
    return res.status(400).send({ error: "No Listing Found" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const CreateListing = async (req, res) => {
  try {
    // TODO: Verify user in listing
    const listing = req.body.listing;
    if (
      listing.title &&
      listing.price &&
      listing.plant &&
      listing.quantity >= 1 &&
      listing.description
    ) {
      const newListing = await Listing.create({
        ...req.body.listing,
        views: 0,
      });
      return res.send(newListing);
    }
    res.status(400).send({ error: "Invalid Fields" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const UpdateListing = async (req, res) => {
  try {
    const listing = req.body.listing;
    const update = await Listing.update(listing, {
      where: { id: req.body.listing_id },
      returning: true,
    });
    const updatedListing = await Listing.findOne({
      where: { id: req.body.listing_id },
      include: {
        model: Image,
        as: "image_listing",
      },
    });
    return res.send(updatedListing);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const ArchiveListing = async (req, res) => {
  try {
    const listing = await Listing.update(
      { quantity: 0 },
      { where: { id: req.params.listing_id }, returning: true }
    );
    return res.send(listing);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const DeleteListing = async (req, res) => {
  try {
    const id = req.params.listing_id;
    const deletedCartsListing = await CartListing.destroy({
      where: { listing_id: id },
    });
    const deletedImage = await Image.destroy({ where: { listing_id: id } });
    const listing = await Listing.findOne({
      where: { id: id },
    });
    const deleted = await listing.destroy();
    return res.send({
      msg: "Deleted listing",
      payload: { listing_id: id },
      deleted: [deletedCartsListing, deletedImage, deleted],
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const SearchForListing = async (req, res) => {
  try {
    const query = req.body.query;
    const results = await Listing.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { plant: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      },
      include: [
        {
          model: Image,
          as: "image_listing",
        },
      ],
    });
    return res.send(results);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

const GetListingsFromUser = async (req, res) => {
  try {
    const results = await Listing.findAll({
      where: { user_id: req.params.user_id },
      include: {
        model: Image,
        as: "image_listing",
      },
    });
    return res.send(results);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
};

module.exports = {
  GetAllListings,
  GetPopularListings,
  GetListingById,
  CreateListing,
  UpdateListing,
  ArchiveListing,
  DeleteListing,
  SearchForListing,
  GetListingsFromUser,
};
