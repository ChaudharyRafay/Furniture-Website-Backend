import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

import NodeRSA from "node-rsa";

import productModel from "../models/productModel.js";
// import { format } from 'date-fns'
// export const getAll = catchAsync(async (req, res) => {
//     // await Listings.deleteMany()
//     const recordPerPage = 5;
//     let pageNo = parseInt(req.query.pageNo || 0);

//     if (pageNo !== 0) {
//         pageNo--;
//     }
//     const count = await Listings.countDocuments({});

//     const Array1 = await Listings.find({}, "price beds m2 floor city streetName streetNo advertiser imagePaths location").limit(recordPerPage)
//         .skip(recordPerPage * pageNo);

//     // console.log(listings);

//     for (let i = 0; i < Array1.length; i++) {
//         var floors = {};

//         if (Array1[i].floor !== undefined) {
//             floors = await floorModel.findOne({ _id: Array1[i].floor }, "name")
//             Array1[i].floor = floors;
//         }
//         else {
//             Array1[i].floor = "";
//         }

//     }

//     if (Array1.length > 0) {

//         return res.status(200).json({
//             success: true,
//             status: 200,
//             message: "Listings found",
//             totalPages: Math.ceil(count / recordPerPage),
//             listings: Array1,
//         });
//     }
//     return res.status(404).json({
//         success: false,
//         status: 404,
//         message: "Listings Not found",
//     });
// });

export const get = catchAsync(async (req, res) => {
  const listing = await productModel.findOne({ _id: req.params.id });
  if (!listing) {
    return res.json({
      success: false,
      status: 404,
      message: "Product Not found",
    });
  }

  return res.json({
    success: true,
    message: "Product found",
    status: 200,
    listing: listing,
  });
});
export const updateCount = catchAsync(async (req, res) => {
  const listing = await productModel.findOneAndUpdate(
    { _id: req.params.id, stockQuantity: { $gt: 0 } },
    { $inc: { stockQuantity: -1 } },
    { new: true }
  );
  if (!listing) {
    return res.json({
      success: false,
      status: 404,
      message: "Stock Quantity could not be updated",
    });
  }

  return res.json({
    success: true,
    message: "Stock Qauntity updated Successfully",
    status: 200,
    listing: listing,
  });
});
export const updateCountInc = catchAsync(async (req, res) => {
  const listing = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { stockQuantity: 1 } },
    { new: true }
  );
  if (!listing) {
    return res.json({
      success: false,
      status: 404,
      message: "Stock Quantity could not be updated",
    });
  }

  return res.json({
    success: true,
    message: "Stock Qauntity updated Successfully",
    status: 200,
    listing: listing,
  });
});

export const add = catchAsync(async (req, res) => {
  // console.log(array);
  // console.log(req.body);
  const listing = await productModel.create({ ...req.body });
  if (!listing) {
    return res.json({
      success: false,
      status: 500,
      message: "Product could not be added",
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "Product added successfully",
    listing,
  });
});

export const del = catchAsync(async (req, res) => {
  const existing = await productModel.findOne({ _id: req.params.id });
  if (!existing) {
    return res.json({
      success: false,
      status: 404,
      message: "Product not found",
    });
  }

  const deleted = await productModel.findByIdAndDelete(existing._id);
  if (!deleted) {
    return res.json({
      success: false,
      status: 500,
      message: "Product could not be deleted",
    });
  }

  return res.status(201).json({
    success: true,
    status: 200,
    message: "Product deleted successfully",
    listing: deleted,
  });
});

export const update = catchAsync(async (req, res) => {
  console.log(req.body.id);
  const existing = await productModel.findOne({ _id: req.body.id });
  if (!existing) {
    return res.json({
      success: false,
      status: 404,
      message: "Product not found",
    });
  }

  const listing = await productModel.findByIdAndUpdate(
    req.body.id,
    {
      ...req.body,
    },
    { new: true }
  );

  if (listing) {
    return res.json({
      success: true,
      status: 200,
      message: "Product updated successfully",
      listing,
    });
  }

  return res.json({
    success: false,
    status: 500,
    message: "Product could not be updated",
  });
});

export const uploadImages = catchAsync(async (req, res) => {
  if (!req.file)
    res.json({
      status: 400,
      success: false,
      message: "Images not uploaded.",
    });
  else {
    // const images = req.files.map((image) => image.path);
    res.json({
      success: true,
      status: 200,
      message: "Images Uploaded",
      images: req.file.path,
    });
  }
});
export const getAll = catchAsync(async (req, res) => {
  const listing = await productModel.find();
  if (!listing) {
    return res.json({
      success: false,
      status: 404,
      message: "Product Not found",
    });
  }

  return res.json({
    success: true,
    message: "Product found",
    status: 200,
    listing: listing,
  });
});

// export const uploadVideo = catchAsync(async (req, res) => {
//     if (!req.file) res.json({
//         success: false,
//         message: "Video not uploaded."
//     });

//     const video = req.file.path;
//     res.json({ success: true, message: "Video Uploaded", video });
// })

// export const getIDs = catchAsync(async (req, res) => {
//     const listingTypeIDs = await listingTypeModel.find();
//     const propertyTypeIDs = await propertyTypeModel.find();
//     const heatingTypeIDs = await heatingTypeModel.find();
//     const occupationTypeIDs = await occupationTypeModel.find();
//     const genderIDs = await genderModel.find();
//     const specificationIDs = await specificationTypeModel.find();
//     const roomCharacteristicsIDs = await roomCharacteristicsModel.find();
//     const featuresIDs = await listingFeaturesModel.find();
//     const accessibilityItemIDs = await accessibilityItemModel.find();
//     const floorIDs = await floorModel.find();

//     const AllIDs = {
//         listingTypeIDs,
//         propertyTypeIDs,
//         heatingTypeIDs,
//         occupationTypeIDs,
//         genderIDs,
//         specificationIDs,
//         roomCharacteristicsIDs,
//         featuresIDs,
//         accessibilityItemIDs,
//         floorIDs

//     };

//     return res.status(200).json({
//         success: true,
//         status: 200,
//         message: "Listings found",
//         IDs: AllIDs,
//     });

// });
// export const getByUser = catchAsync(async (req, res) => {
//     const listing = await Listings.find({ advertiser: req.params.id }, "price beds m2 floor city streetName streetNo advertiser imagePaths location addedBy");
//     const viewerId = req.body.viewerId;

//     if (listing.length == 0) {
//         return res.json({
//             success: false,
//             status: 404,
//             message: "Listing Not found",
//         });
//     }
//     else {
//         console.log(listing);
//         const detailedListings = []

//         for (let i = 0; i < listing.length; i++) {
//             detailedListings.push(
//                 await getDetailedListing(listing[i].toObject())
//             )
//         }

//         const userWishlist = await wishlistModel.find({ userId: viewerId });
//         console.log(userWishlist);

//         for (let i = 0; i < detailedListings.length; i++) {

//             for (let j = 0; j < userWishlist.length; j++) {
//                 console.log(userWishlist[j].listingId);

//                 console.log(detailedListings[i]._id);

//                 if (detailedListings[i]._id.toString() == userWishlist[j].listingId.toString()) {

//                     detailedListings[i].likedStatus = "liked";
//                     detailedListings[i].recordId = userWishlist[j]._id;
//                 }

//             }
//         }

//         return res.json({
//             success: true,
//             message: "Listing found",
//             status: 200,
//             listing: detailedListings,
//         });
//     }
// });

// for (let i = 0; i < listings.length; i++) {
//     detailedListings.push(
//         await getDetailedListing(listings[i].toObject())
//     )
// }

// function chk11() {
//     const val = geolib.isPointInPolygon({ latitude: 51.5125, longitude: 7.485 }, [
//         { latitude: 51.5, longitude: 7.4 },
//         { latitude: 51.555, longitude: 7.4 },
//         { latitude: 51.555, longitude: 7.625 },
//         { latitude: 51.5125, longitude: 7.625 },
//     ]);

//     console.log(val);
// }
// chk11();
// [
//     { "latitude": 51.5, "longitude": 7.4 },
//     { "latitude": 51.555, "longitude": 7.4 },
//     { "latitude": 51.555, "longitude": 7.625 },
//     { "latitude": 51.5125, "longitude": 7.625 },
// { "latitude": 33.64919518023462, "longitude": 73.06610774248838 }
// ]
