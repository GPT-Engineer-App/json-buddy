import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [isTreeView, setIsTreeView] = useState(false);
  const [jsonStats, setJsonStats] = useState({ keys: 0, depth: 0 });

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const prettyJson = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(prettyJson);
      updateJsonStats(parsedJson);
      toast.success("JSON formatted successfully!");
    } catch (error) {
      toast.error("Invalid JSON input!");
    }
  };

  const handleValidateJson = () => {
    try {
      JSON.parse(jsonInput);
      toast.success("Valid JSON!");
    } catch (error) {
      toast.error("Invalid JSON!");
    }
  };

  const handleToggleTreeView = () => {
    setIsTreeView(!isTreeView);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    toast.success("Formatted JSON copied to clipboard!");
  };

  const updateJsonStats = (json) => {
    const keys = Object.keys(json).length;
    const depth = getJsonDepth(json);
    setJsonStats({ keys, depth });
  };

  const getJsonDepth = (obj) => {
    let depth = 0;
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        const tempDepth = getJsonDepth(obj[key]);
        if (tempDepth > depth) {
          depth = tempDepth;
        }
      });
      depth++;
    }
    return depth;
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>JSON Formatter and Validator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label htmlFor="jsonInput">JSON Input</Label>
            <Input
              id="jsonInput"
              as="textarea"
              rows="10"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2 mb-4">
            <Button onClick={handleFormatJson}>Format JSON</Button>
            <Button onClick={handleValidateJson}>Validate JSON</Button>
            <Button onClick={handleToggleTreeView}>
              {isTreeView ? "Show Raw JSON" : "Show Tree View"}
            </Button>
            <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
          </div>
          <div className="mb-4">
            <Label>JSON Output</Label>
            {isTreeView ? (
              <pre>{JSON.stringify(JSON.parse(formattedJson), null, 2)}</pre>
            ) : (
              <SyntaxHighlighter language="json" style={docco}>
                {formattedJson}
              </SyntaxHighlighter>
            )}
          </div>
          <div>
            <Label>JSON Statistics</Label>
            <p>Number of keys: {jsonStats.keys}</p>
            <p>Depth of nesting: {jsonStats.depth}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;