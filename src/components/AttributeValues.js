import React from 'react';

const AttributeValues = ({ attributes }) => {

    const sizes = attributes.slice(0, 5);
    const colors = attributes.slice(5);

    return (
        <div>
            <p>Size</p>
            <select name="sizes" id="sizes">
                {sizes.map((size, i) => (
                    <option key={i + size.value} value={size.value}>{size.value}</option>
                ))}
            </select>
            <p>Color</p>
            <select name="colors" id="colors">
                {colors.map((color, i) => (
                    <option key={i + color.value} value={color.value}>{color.value}</option>
                ))}
            </select>
        </div>
    )
}

export default AttributeValues;