import React from 'react';

function PageHeader(props) {
  return (
    <section id="page-header">
      <div className="dark-overlay">
        <div className="row">
          <div className="col-md-6 m-auto text-white pt-3">
            <h2 className="display-3 animated zoomIn">{ props.title }</h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageHeader;