import z, { boolean } from "zod";
const RegisterBody = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    email: z.string().email("Invalid email address")
  });

const LoginBody = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
  });
const ProfileBody = z.object({
    name: z.string().min(1, "Name is required"),
    preferences: z.object({
      notifications: z.boolean()
    })
  });

const ResetBody = z.object({
  email: z.string().email("Invalid email address")
});

const PreferencesBody = z.object({
    notifications: z.boolean(),
    theme: z.string().default("dark")
  });

const ChallengesBody = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format")
  });

const JoinChallengeBody = z.object({
    userId: z.string().min(1, "User ID is required")
  });

const LeaveChallengeBody = z.object({
    userId: z.string().min(1, "User ID is required")
  });

const DepositBody = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

const WithdrawBody = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

const StakeBody = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

const HealthConnectBody = z.object({
    provider: z.string().min(1, "Provider is required"),
    accessToken: z.string().min(1, "Access token is required")
  });

const ManualEntryBody = z.object({
    steps: z.number().min(0, "Steps must be a positive number"),
    caloriesBurned: z.number().min(0, "Calories burned must be a positive number"),
    activeMinutes: z.number().min(0, "Active minutes must be a positive number"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  });

const SignTransactionBody = z.object({
    transaction: z.string().min(1, "Transaction data is required")
  });

const SubmitTransactionBody = z.object({
    signedTransaction: z.string().min(1, "Signed transaction data is required")
  });

const CommentBody = z.object({
    postId: z.string().min(1, "Post ID is required"),
    comment: z.string().min(1, "Comment is required")
  });

const PayoutBody = z.object({
    userId: z.string().min(1, "User ID is required"),
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

const NotificationSettingsBody = z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean()
  });