-- CreateEnum
CREATE TYPE "gender" AS ENUM ('Men', 'Women', 'Kids');

-- CreateTable
CREATE TABLE "Products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_name" TEXT,
    "image_url" TEXT[],
    "subdivision" TEXT,
    "product_description" TEXT,
    "product_price" DECIMAL DEFAULT 0,
    "product_color" TEXT[],
    "product_size" TEXT[],
    "in_stock" SMALLINT,
    "sizing_information" TEXT,
    "shipping" TEXT,
    "returns" TEXT,
    "division" "gender" NOT NULL DEFAULT 'Women',

    CONSTRAINT "Product List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT,
    "password" TEXT DEFAULT '',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

