import Editor from "./components/Editor";

function Home() {
  const handleSave = (data) => {
    console.log("pipi data editorjs: ", data);
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>Editor.js teste</h1>
      <Editor onSave={handleSave} />
    </div>
  );
}

export default Home;
