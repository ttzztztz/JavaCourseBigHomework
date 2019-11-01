import React from "react";

const EditList: React.FC = () => {
    return (
        <>
            <div>
                <input type="text" placeholder="组名" required name="edit-list" />
            </div>
            <div>
                <button>提交</button>
            </div>
        </>
    );
};

export default EditList;
