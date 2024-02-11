const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dmw1rd0to',
    api_key: '781713774759227',
    api_secret: 'zLQ8oSkGRQKrv-_yH8RK4-b3SZA'
});


//cloudinery upload image

const cloudinaryUploadImage = async (fileToUpload) => {
    try {
        const data = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: 'auto',
        });
        return data;

    } catch (error) {
        console.log(error)
        throw new Error('Internal Server Error (cloudinary)');
    }
}

//cloudinery remove image

const cloudinaryRemoveImage = async (imagePublicId) => {
    try {
        const result = await cloudinary.uploader.destroy(imagePublicId);
        return result;

    } catch (error) {
       console.log(error)
        throw new Error('Internal Server Error (cloudinary)');
    }
}
//cloudinery remove multiple image

const cloudinaryRemoveMultipleImage = async (publicIds) => {
    try {
        const result = await cloudinary.api.delete_resources(publicIds);
        return result;

    } catch (error) {
        console.log(error)
        throw new Error('Internal Server Error (cloudinary)');
    }
}


module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
}