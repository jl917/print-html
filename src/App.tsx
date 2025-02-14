import React, { useState, useCallback } from "react";
import { EuiRange, EuiFormRow, EuiTextArea, EuiPanel, EuiTitle, EuiSpacer, EuiText } from "@elastic/eui";
import wcwidth from "wcwidth";

const App = () => {
  const [lineWidth, setLineWidth] = useState(42);
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState<string[]>([]);

  // 텍스트 포맷팅 함수
  const formatText = useCallback((text: string, maxWidth: number) => {
    const lines: string[] = [];
    let currentLine = "";
    let currentWidth = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charWidth = wcwidth(char);

      if (currentWidth + charWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = char;
        currentWidth = charWidth;
      } else {
        currentLine += char;
        currentWidth += charWidth;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }, []);

  // 입력 텍스트 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setFormattedText(formatText(newText, lineWidth));
  };

  // 라인 너비 변경 핸들러
  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setLineWidth(newWidth);
    setFormattedText(formatText(inputText, newWidth));
  };

  return (
    <>
      <EuiPanel style={{ width: "90%", margin: "0 auto" }}>
        <EuiTitle size="s">
          <h2>Text Width Formatter</h2>
        </EuiTitle>

        <EuiSpacer size="m" />

        <EuiFormRow
          label={`Line Width: ${lineWidth}`}
          fullWidth
        >
          <EuiRange
            min={20}
            max={80}
            value={lineWidth}
            onChange={handleLineWidthChange as any}
            // showTicks
            showValue
            fullWidth
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow
          label="Input Text"
          fullWidth
        >
          <EuiTextArea
            placeholder="텍스트를 입력하세요..."
            value={inputText}
            onChange={handleInputChange}
            rows={4}
            fullWidth
          />
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiFormRow
          label="Formatted Output"
          fullWidth
        >
          <EuiPanel
            color="subdued"
            hasShadow={false}
            style={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            {formattedText.map((line, index) => (
              <div
                style={{
                  borderBottom: index < formattedText.length - 1 ? "1px dashed #D3DAE6" : "none",
                  padding: "4px 0",
                }}
              >
                {line.split("").map((e) => {
                  if (e === "\n") {
                    return <br />;
                  }
                  const cl = wcwidth(e);
                  return (
                    <span
                      style={{
                        display: "inline-block",
                        width: cl === 2 ? 24 : 12,
                        border: "1px solid #ddd",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      {e}
                    </span>
                  );
                })}
              </div>
            ))}
          </EuiPanel>
        </EuiFormRow>
      </EuiPanel>
    </>
  );
};

export default App;
