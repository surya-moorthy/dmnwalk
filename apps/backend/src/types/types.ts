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

export const ChallengeSchema = z.object({
    // Required fields
    title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
    
    description: z.string().max(1000, "Description must be less than 1000 characters").nullable().optional(),
    
    // Category handling - could be an ID or a name depending on your frontend approach
    category: z.object({
      // If connecting to existing category by ID
      id: z.number().int().positive().optional(),
      // If connecting to existing category by name or creating new one
      name: z.string().min(1).optional()
    }).refine(data => data.id !== undefined || data.name !== undefined, {
      message: "Either category ID or name must be provided"
    }),
    
    creator_id: z.number().int().positive().optional(),
 
    is_public: z.boolean().default(true),

    goal_type: z.string().min(1, "Goal type is required"),
    goal_value: z.number().int().positive("Goal value must be a positive number"),

    duration_days: z.number().int().positive("Duration must be a positive number of days"),

    stake_amount: z.string()
      .refine(val => !isNaN(parseFloat(val)), "Stake amount must be a valid number")
      .transform(val => parseFloat(val)),
    
    min_participants: z.number().int().positive().default(2),
    max_participants: z.number().int().positive().nullable().optional(),

    start_date: z.string()
      .refine(val => !isNaN(Date.parse(val)), "Start date must be a valid date")
      .transform(val => new Date(val)),
    
    end_date: z.string()
      .refine(val => !isNaN(Date.parse(val)), "End date must be a valid date")
      .transform(val => new Date(val)),
    
    registration_deadline: z.string()
      .refine(val => !isNaN(Date.parse(val)), "Registration deadline must be a valid date")
      .transform(val => new Date(val)),
    status: z.string().default("pending").optional(),
    smart_contract_address: z.string().nullable().optional()
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
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
  });

export const WithdrawSchema = z.object({
    amount: z.number().positive("Amount must be a positive number"),
    currency: z.string().min(1, "Currency is required")
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