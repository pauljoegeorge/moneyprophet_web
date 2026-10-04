import styled from "styled-components";
import {
  NavigateNext,
  NavigateBefore,
  Download,
  Toc,
  Edit,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { colors } from "../utils/colors";

export const LeftArrow = styled(NavigateBefore)`
  color: var(--muted-foreground);
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-right: 8px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 50%;
  padding: 4px;
  box-shadow: var(--shadow-sm);
  transition: background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};

  &:hover {
    background: var(--muted);
    box-shadow: var(--shadow-md);
    color: var(--primary);
  }
`;

export const RightArrow = styled(NavigateNext)`
  color: var(--muted-foreground);
  cursor: pointer;
  margin-left: 8px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 50%;
  padding: 4px;
  box-shadow: var(--shadow-sm);
  transition: background 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--muted);
    box-shadow: var(--shadow-md);
    color: var(--primary);
  }
`;

export const PlusIcon = styled(AddIcon)`
  color: var(--muted-foreground);
  cursor: pointer;
  margin-left: 14px;
  min-width: 50px;
`;

export const DownloadIcon = styled(Download)`
  color: var(--muted-foreground);
  cursor: pointer;
  margin-left: 14px;
  background: var(--card);
`;

export const TableViewMode = styled(Toc)`
  color: var(--muted-foreground);
  cursor: pointer;
  margin-left: 14px;
  background: var(--card);
`;

export const EditMode = styled(Edit)`
  color: var(--muted-foreground);
  cursor: pointer;
  margin-left: 14px;
  padding: 2px 0px;
  background: var(--card);
`;
