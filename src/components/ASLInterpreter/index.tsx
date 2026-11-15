import { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography, Paper, Tooltip, Fab } from "@mui/material";
import {
  ZoomIn,
  ZoomOut,
  DragIndicator,
  Visibility,
  VisibilityOff,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { translateToASL } from "../../utils/aslTranslation";
import { generateASLSummary } from "../../utils/aslSummary";
import "./styles.css";

interface ASLInterpreterProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  captions?: string;
  isPlaying: boolean;
}

export function ASLInterpreter({ videoRef, captions, isPlaying }: ASLInterpreterProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [size, setSize] = useState({ width: 280, height: 200 });
  const [currentASL, setCurrentASL] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying && captions) {
      translateCaption(captions);
    }
  }, [isPlaying, captions]);

  useEffect(() => {
    if (isPlaying && captions) {
      generateSummary(captions);
    }
  }, [isPlaying]);

  const translateCaption = async (text: string) => {
    if (!text || !isPlaying) return;
    
    setIsLoading(true);
    try {
      const aslText = await translateToASL(text);
      setCurrentASL(aslText);
    } catch (error) {
      console.error("ASL translation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSummary = async (text: string) => {
    try {
      const summaryText = await generateASLSummary(text);
      setSummary(summaryText);
    } catch (error) {
      console.error("Summary generation error:", error);
    }
  };

  const handleResize = (event: any, { size: newSize }: any) => {
    setSize({ width: newSize.width, height: newSize.height });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isPlaying) {
    return null;
  }

  if (!isVisible) {
    return (
      <Fab
        color="primary"
        size="small"
        onClick={toggleVisibility}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          bgcolor: "#0e5a42",
          "&:hover": { bgcolor: "#0a4630" },
          zIndex: 1000,
        }}
        aria-label="Show ASL interpreter"
      >
        <Visibility />
      </Fab>
    );
  }

  return (
    <Resizable
      width={isFullscreen ? 600 : size.width}
      height={isFullscreen ? 450 : size.height}
      onResize={handleResize}
      minConstraints={[200, 150]}
      maxConstraints={[800, 600]}
      resizeHandles={["se"]}
    >
      <Paper
        ref={containerRef}
        elevation={8}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: isFullscreen ? 600 : size.width,
          height: isFullscreen ? 450 : size.height,
          bgcolor: "#1b3048",
          color: "#f7f4ee",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "3px solid #0e5a42",
          borderRadius: 2,
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        role="complementary"
        aria-label="ASL Interpreter - Pocket Sign"
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            bgcolor: "#0e5a42",
            borderBottom: "3px solid #ffee00",
            cursor: "move",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DragIndicator sx={{ color: "#f7f4ee" }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "Literata, serif",
                fontWeight: 600,
                color: "#f7f4ee",
                fontSize: "0.95rem",
              }}
            >
              🤟 Pocket Sign
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title="Toggle fullscreen">
              <IconButton
                size="small"
                onClick={toggleFullscreen}
                sx={{ color: "#f7f4ee" }}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Hide interpreter">
              <IconButton
                size="small"
                onClick={toggleVisibility}
                sx={{ color: "#f7f4ee" }}
                aria-label="Hide ASL interpreter"
              >
                <VisibilityOff />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* ASL Display Area */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            bgcolor: "#111111",
            position: "relative",
            overflow: "auto",
          }}
        >
          {isLoading ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#ffee00" }}>
                Translating to ASL...
              </Typography>
            </Box>
          ) : currentASL ? (
            <Box sx={{ textAlign: "center", width: "100%" }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "#ffee00",
                  letterSpacing: "0.1em",
                  lineHeight: 1.6,
                  textTransform: "uppercase",
                  wordBreak: "break-word",
                }}
              >
                {currentASL}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "#f7f4ee", opacity: 0.7 }}>
              Waiting for captions...
            </Typography>
          )}

          {/* Summary Badge */}
          {summary && (
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                right: 8,
                bgcolor: "rgba(14, 90, 66, 0.9)",
                borderRadius: 1,
                p: 1,
                maxHeight: "40%",
                overflow: "auto",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#f7f4ee",
                  fontSize: "0.75rem",
                  display: "block",
                }}
              >
                <strong>AI Summary:</strong> {summary}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer with branding */}
        <Box
          sx={{
            p: 0.5,
            bgcolor: "rgba(27, 48, 72, 0.8)",
            borderTop: "1px solid rgba(255, 238, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#f7f4ee",
              opacity: 0.8,
              fontSize: "0.7rem",
            }}
          >
            Powered by Pocket Sign AI
          </Typography>
        </Box>

        {/* Resize handle indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 20,
            height: 20,
            cursor: "se-resize",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 2,
              right: 2,
              width: 12,
              height: 12,
              borderRight: "2px solid #ffee00",
              borderBottom: "2px solid #ffee00",
            },
          }}
        />
      </Paper>
    </Resizable>
  );
}
