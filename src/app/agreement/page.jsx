const Document = ({ doc }) => {
  return (
    <object
      style={{ height: "100vh", width: "100%" }}
      type="application/pdf"
      data="/docs/agreement.pdf"
    >
      <p>
        It appears you don't have a PDF plugin for this browser. No problem! You
        can
        <a href={doc}>click here to download the PDF file.</a>
      </p>
    </object>
  );
};

export default Document;
