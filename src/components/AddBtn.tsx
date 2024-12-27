import {
  arrayAtomFamily,
  booleanDefaultTrueAtomFamily,
  objectAtomFamily,
} from "@/recoil/atom";
import { atomKey } from "@/recoil/atom-key";
import { useRecoilState, useSetRecoilState } from "recoil";

function AddBtn({ prevSectionInd, builderInstance }) {
  const [editor, setEditor] = useRecoilState(
    arrayAtomFamily(atomKey.editorContainer)
  );
  const [activeSection, setActiveSection] = useRecoilState<any>(
    objectAtomFamily(atomKey.activeSection)
  );
  const setIsRemountEditor = useSetRecoilState(
    booleanDefaultTrueAtomFamily(atomKey.isRemountEditor)
  );
  function handleAddEditor() {
    const updatedEditor: any = [...editor];
    if (prevSectionInd !== null) {
      updatedEditor.splice(prevSectionInd + 1, 0, {
        id: crypto.randomUUID(),
        sectionName: "Section",
        className: `pb-editor-${editor.length + 1}`,
        html: null,
      });
      // console.log({ updatedEditor });
    } else {
      updatedEditor.push({
        id: crypto.randomUUID(),
        sectionName: "Section",
        className: `pb-editor-${editor.length + 1}`,
        html: null,
      });
    }
    // console.log({ builderInstance });
    console.log("add editor");
    setActiveSection({});
    setEditor(updatedEditor);

    builderInstance?.applyBehavior();
    setIsRemountEditor(false);
    setTimeout(() => {
      setIsRemountEditor(true);
    }, 500);
  }

  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="text-white   bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleAddEditor}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}

export default AddBtn;
