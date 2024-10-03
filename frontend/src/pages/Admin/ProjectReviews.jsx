import React from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { getProjectReviews } from "../../api/Api";
import { useState } from "react";
import { useEffect } from "react";

function ProjectReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async function getAllReviews() {
      const response = await getProjectReviews();

      if (response.status === 200) {
        setReviews(response.data.reviews);
      }
    })();
  }, []);

  return (
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="w-70 ms-5">
            <h4 className="ms-3">Project Reviews</h4>
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">Author</th>
                  <th scope="col">Review</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((rvw) => (
                  <tr key={rvw._id}>
                    <td col="">
                      <h6>{rvw.author.name}</h6>
                    </td>
                    <td col="">
                      <h6>{rvw.review}</h6>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectReviews;
