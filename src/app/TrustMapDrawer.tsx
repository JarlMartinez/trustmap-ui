import { Box, Divider, Drawer, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TrustMapNode } from "../types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  activeNode: TrustMapNode | undefined;
  setActiveNode: Dispatch<SetStateAction<TrustMapNode | undefined>>;
}

export const TrustMapDrawer = (props: Props): JSX.Element => {
  const { activeNode, setActiveNode } = props;
  return (
    <Drawer
      variant="persistent"
      hideBackdrop
      anchor="right"
      elevation={20}
      open={!!activeNode}
    >
      {(function () {
        if (!activeNode) return;
        return (
          <Box
            sx={{
              width: "35vw",
              padding: "12px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton sx={{ alignSelf: "flex-end" }}>
              <CloseIcon onClick={() => setActiveNode(undefined)} />
            </IconButton>
            <h4
              style={{ fontSize: "24px", fontWeight: "normal", margin: "5px" }}
            >
              {activeNode.title}
            </h4>
            <h5
              style={{
                fontSize: "16px",
                fontWeight: "normal",
                margin: "10px",
                marginBottom: "20px",
              }}
            >
              {activeNode.subTitle}
            </h5>
            <Divider sx={{ marginBottom: "20px" }} />
            <Grid container spacing={2}>
              <Grid item xs={5}>
                Trusty:
              </Grid>
              <Grid item xs={7}>
                {activeNode.arc__passed * 100}%
              </Grid>

              <Grid item xs={5}>
                Role:
              </Grid>
              <Grid item xs={7}>
                {activeNode.detail__role}
              </Grid>

              <Grid item xs={5}>
                Certificates found:
              </Grid>
              <Grid item xs={7}>
                {activeNode.detail__certcount ?? "n/a"}
              </Grid>

              <Grid item xs={5}>
                Container Signature:
              </Grid>
              <Grid item xs={7}>
                {activeNode.detail__imagesig ?? "n/a"}
              </Grid>

              <Grid item xs={5}>
                mTLS:
              </Grid>
              <Grid item xs={7}>
                active
              </Grid>
            </Grid>
          </Box>
        );
      })()}
    </Drawer>
  );
};
