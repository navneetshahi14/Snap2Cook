import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";


export const UsersTable = pgTable("Users",{
    id: serial("id").primaryKey(),
    userName: text("user_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow()
})


export const favoritesTable = pgTable("favorites",{
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(()=> UsersTable.id).notNull(),
    recipeId: integer("recipe_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cookTime: text("cook_time"),
    servings: text("servings"),
    createdAt: timestamp("created_at").defaultNow()
})

