import React, { useEffect, useState } from "react";
import { arrayAtomFamily, objectAtomFamily } from "@/recoil/atom";
import { atomKey } from "@/recoil/atom-key";
import { useRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionNameEditor from "@/components/SectionNameEditor";

function ContentBuilderEditor({ data, builderInstance, index }) {
  const [activeSection, setActiveSection] = useRecoilState<any>(
    objectAtomFamily(atomKey.activeSection)
  );
  const [editor, setEditor] = useRecoilState(
    arrayAtomFamily(atomKey.editorContainer)
  );
  const [isAi, setIsAi] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    builderInstance?.loadHtml(
      data.html ||
        `<div class="row">
            <div class="column">
                <p class="">
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>`,
      document.querySelector(`.${data.className}`)
    );
  }, []);

  function handleOnClick() {
    setActiveSection(data);
  }

  const handleSectionNameSave = (newName) => {
    setEditor((prevEditor: any) =>
      prevEditor.map((item) =>
        item.id === data.id ? { ...item, sectionName: newName } : item
      )
    );

    if (activeSection.id === data.id) {
      setActiveSection((prev) => ({ ...prev, sectionName: newName }));
    }
  };

  return (
    <div
      className={`builder-wrapper  ${
        activeSection.id === data.id ? "editor-focus" : ""
      }`}
      data-section-id={data.id}
    >
      {/* Section Name Header */}
      <div
        className={`
          transition-all duration-200
          ${
            activeSection.id === data.id
              ? "opacity-100"
              : "opacity-50 hover:opacity-75"
          }
        `}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="group h-auto py-2"
        >
          <span className="font-medium">{data.sectionName}</span>
          <Pencil
            size={14}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </Button>
      </div>

      {/* Content Editor */}
      <Card className="border rounded-lg p-4">
        <CardContent className="p-0">
          <div
            onMouseUp={() => {
              const text = window.getSelection()?.toString() || "";
              setIsAi(text);
            }}
            onClick={handleOnClick}
          >
            <div
              className={`pb-editor max-w-[800px] mx-auto p-4 ${data.className}`}
              data-section-id={data.id}
            />
          </div>
        </CardContent>
      </Card>

      {/* Section Name Editor Modal */}
      <SectionNameEditor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialName={data.sectionName}
        onSave={handleSectionNameSave}
      />
    </div>
  );
}

export default ContentBuilderEditor;
