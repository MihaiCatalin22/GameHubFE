import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import ReactPaginate from "react-paginate";

const ForumPostsList = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

  const handleSelectPost = (postId) => {
    navigate(`/forum/${postId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayPosts = filteredPosts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => (
      <div
        key={post.id}
        onClick={() => handleSelectPost(post.id)}
        className="forum-post-item"
      >
        <h3 className="forum-post-title">{post.title}</h3>
        <p className="forum-post-content">{post.content.substring(0, 100)}...</p>
        <time dateTime={post.creationDate} className="forum-post-date">
          {new Date(post.creationDate).toLocaleString()}
        </time>
      </div>
    ));

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="forum-posts-list-page">
      <h2>Forum Posts</h2>
      <input
        type="text"
        className="user-search-input"
        placeholder="Search forum posts..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="forum-posts-list">
        {displayPosts}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pagination__page"}
        pageLinkClassName={"pagination__link"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default ForumPostsList;