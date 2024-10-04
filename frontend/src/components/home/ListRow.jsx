import React, { useRef, useEffect, useContext } from "react";
import cx from "classnames";
import { DynamicListContext } from "./Index";

const ListRow = ({ index, data, style }) => {
  const { setSize } = useContext(DynamicListContext);
  const rowRoot = useRef(null);

  useEffect(() => {
    if (rowRoot.current) {
      setSize(index, rowRoot.current.getBoundingClientRect().height);
    }
  }, [index, setSize]);

  return (
    <div style={style}>
      <div
        ref={rowRoot}
        className={cx(
          index % 2 ? "bg-white" : "bg-gray-200",
          "px-6 py-4 text-sm leading-5 font-medium text-gray-900"
        )}
      >
        Row {index}: {data[index]} {/* Add an index for easier debugging */}
      </div>
    </div>
  );
};

export default ListRow;
