import ImageUploading, { ImageListType } from "react-images-uploading";
import { ImageUploaderType } from "../../types";
import "./ImagesUploader.css";

export const ImagesUploader = (props: ImageUploaderType) => {
  const { image, onChange: outerOnChange, onRemove: outerOnRemove } = props;

  const onChange = (imageList: ImageListType) => {
    outerOnChange(imageList);
  };
  const onRemove = (func: Function, index: number) => {
    outerOnRemove();
    func(index);
  };
  return (
    <ImageUploading
      value={image && Object.keys(image).length !== 0 ? [image] : []}
      onChange={onChange}
    >
      {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
        <div className="upload__image-wrapper">
          <input
            className="upload__input"
            placeholder="Select file"
            value={(imageList[0] && imageList[0].file?.name) || ""}
            disabled
            {...dragProps}
          />
          <button
            className="upload__btn"
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
          >
            {imageList[0] ? "Change" : "Upload or Drop here"}
          </button>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.dataURL} alt="post img" width="200" />
              <div className="image-item__btn-wrapper">
                <button
                  className="image-item__btn-remove"
                  onClick={() => onRemove(onImageRemove, index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};
