import { useEffect, useMemo } from "react";
import { useState } from "react";

const Shape = ({ data }) => {
  const [selected, setSelected] = useState([]); //to store all selected box indexes
  const [removing, setRemoving] = useState(false); //to check if boxes are being removed

  const allBoxes = useMemo(() => data.flat(Infinity), [data]); // to get flat array

  // store number of boxes with 1
  const numberOfBoxes = allBoxes.reduce((acc, itr) => {
    return acc + itr;
  }, 0);

  // Method to handle box-click
  const handleClick = (e) => {
    const index = e.target.getAttribute("data-index");
    const status = e.target.getAttribute("data-status");

    if (
      index == null ||
      status == "hidden" ||
      selected.includes(+index) ||
      removing
    )
      return;

    setSelected([...selected, +index]);
  };

  // method to remove background once boxes all are selected
  const removeSelect = () => {
    setRemoving(true);

    const removeNextKey = () => {
      if (selected.length) {
        selected.shift();
        const updatedKeys = [...selected];
        setSelected(updatedKeys);

        setTimeout(removeNextKey, 500);
      } else {
        setRemoving(false);
      }
    };

    setTimeout(removeNextKey, 100);
  };

  useEffect(() => {
    if (selected.length === numberOfBoxes) removeSelect();
  }, [selected]);

  return (
    <div className="boxes" onClick={(e) => handleClick(e)}>
      {allBoxes.map((box, index) => {
        const status = box === 1 ? "visible" : "hidden";
        const isSelected = selected?.includes(index);

        return (
          <div
            key={`${box}-${index}`}
            className={`box ${status} ${isSelected && "selected"}`}
            data-index={index}
            data-status={status}
          ></div>
        );
      })}
    </div>
  );
};

export default Shape;
