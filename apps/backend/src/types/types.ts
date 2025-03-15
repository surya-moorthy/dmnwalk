import z, { boolean } from "zod";
export const RegisterSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    email: z.string().email("Invalid email address")
  });

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
  });
export const ProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    preferences: z.object({
      notifications: z.boolean()
    })
  });

export const ResetSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long")
  });

export const PreferencesSchema = z.object({
    notifications: z.boolean(),
    theme: z.string().default("dark")
  });

export const CreateChallengeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().optional(),
    category_id: z.number().int().positive().optional(),
    creator_id: z.number().int().positive().optional(),
    is_public: z.boolean().default(true),
    goal_type: z.string(), // e.g., "steps", "distance", "meditation"
    goal_value: z.number().positive("Goal value must be a positive number"), // Target value (e.g., 5000 steps)
    goal_unit: z.string(), // e.g., "steps", "minutes"
    frequency: z.enum(["daily", "weekly"]).default("daily"),
    duration_days: z.number().int().positive("Duration must be a positive number"),
    stake_amount: z.string().refine((val) => !isNaN(parseFloat(val)), {
      message: "Stake amount must be a valid decimal number",
    }),
    total_pool: z.string().optional().refine((val) => !val || !isNaN(parseFloat(val)), {
      message: "Total pool must be a valid decimal number",
    }),
    min_participants: z.number().int().min(2).default(2),
    max_participants: z.number().int().optional(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    registration_deadline: z.coerce.date().optional(),
    reward_distribution_type: z.enum(["proportional", "winner-takes-all", "equal"]).default("proportional"),
    status: z.enum(["pending", "active", "completed", "canceled"]).default("pending"),
    smart_contract_address: z.string().optional(),
    escrow_address: z.string().optional(),
  });
  
  
export const UpdateUserPreferencesSchema = z.object({
    theme: z.enum(["light", "dark"]).optional(),
    language: z.string().optional(),
    notifications: z.object({
        email: z.boolean().optional(),
        push: z.boolean().optional(),
        sms: z.boolean().optional(),
    }).optional(),
    emailNotifications: z.boolean().optional(),
    pushNotifications: z.boolean().optional(),
    dailyReminders: z.boolean().optional(),
    privacySettings: z.object({
      profileVisibility: z.enum(["public", "friendsOnly", "private"]).optional(),
      activityVisibility: z.enum(["public", "friendsOnly", "private"]).optional(),
      emailVisibility: z.enum(["public", "friendsOnly", "private"]).optional(),
    }).optional(),
  });
  
 export const ChallengeUpdateSchema = z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().nullable().optional(),
    goal_type: z.string().optional(),
    goal_value: z.number().positive().optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    duration_days: z.number().positive().int().optional(),
    stake_amount: z.number().nonnegative().optional(),
    registration_deadline: z.date().optional(),
    category_id: z.number().int().positive().optional(),
  })


export const JoinChallengeSchema = z.object({
    userId: z.string().min(1, "User ID is required")
  });

export const LeaveChallengeSchema = z.object({
    userId: z.string().min(1, "User ID is required")
  });
export const DepositSchema = z.object({
    user_id: z.number().int().positive(),
    payment_method_id: z.number().int().positive(),
    amount: z.number().positive(),
    transaction_type : z.string().default("deposit"),
    currency: z.string().default("USD"),
    status: z.string().default("pending"),
    description: z.string().optional(),
  });
  
export const WithdrawSchema = z.object({
    user_id: z.number().int().positive(),
    payment_method_id: z.number().int().positive(),
    amount: z.number().positive(),
    currency: z.string().default("USD"),
    description: z.string().optional(),
  });
  

export const StakeSchema = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

export const HealthConnectSchema = z.object({
    provider: z.string().min(1, "Provider is required"),
    accessToken: z.string().min(1, "Access token is required")
  });

export const ManualEntrySchema = z.object({
    steps: z.number().min(0, "Steps must be a positive number"),
    caloriesBurned: z.number().min(0, "Calories burned must be a positive number"),
    activeMinutes: z.number().min(0, "Active minutes must be a positive number"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
  });

export const SignTransactionSchema = z.object({
    transaction: z.string().min(1, "Transaction data is required")
  });

export const SubmitTransactionSchema = z.object({
    signedTransaction: z.string().min(1, "Signed transaction data is required")
  });

export const CommentSchema = z.object({
    postId: z.string().min(1, "Post ID is required"),
    comment: z.string().min(1, "Comment is required")
  });

export const PayoutSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

export const NotificationSettingsSchema = z.object({
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean()
  });