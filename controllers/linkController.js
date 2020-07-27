const Link = require('../models/linkModel');

//Functions
exports.getAllLinks = async (req, res) => {
  console.log(req.query);
  try {
    const allLinks = await Link.find();
    res.status(200).json({
      status: 'success',
      data: allLinks,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getLink = async (req, res) => {
  try {
    const singleLink = await Link.findById(req.params.id);
    // Link.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: singleLink,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createLink = async (req, res) => {
  try {
    const newLink = await Link.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        link: newLink,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateLink = async (req, res) => {
  try {
    const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: updatedLink,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
