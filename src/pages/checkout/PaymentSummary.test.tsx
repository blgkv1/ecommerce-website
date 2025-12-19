import { it, expect, describe, vi, beforeEach } from "vitest";
import PaymentSummary from "./PaymentSummary";
import { render, screen, within, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Routes, Route } from "react-router-dom";

vi.mock("axios");
