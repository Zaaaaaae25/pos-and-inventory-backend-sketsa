/*
  Warnings:

  - You are about to drop the column `outlet_id` on the `cashier_shifts` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `delivery_integrations` table. All the data in the column will be lost.
  - You are about to drop the column `ingredient_package_id` on the `goods_receipt_items` table. All the data in the column will be lost.
  - You are about to drop the column `qty_damaged` on the `goods_receipt_items` table. All the data in the column will be lost.
  - You are about to drop the column `qty_received` on the `goods_receipt_items` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `goods_receipt_items` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ingredient_packages` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `valid_from` on the `menu_prices` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `menus` table. All the data in the column will be lost.
  - You are about to drop the column `discount_type` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the column `discount_value` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `promotions` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `purchase_orders` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `report_files` table. All the data in the column will be lost.
  - You are about to drop the column `from_outlet_id` on the `stock_transfers` table. All the data in the column will be lost.
  - You are about to drop the column `to_outlet_id` on the `stock_transfers` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `tables` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `outlet_id` on the `wastes` table. All the data in the column will be lost.
  - You are about to drop the `outlet_ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outlets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_adjustments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouse_stocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,role_id,place_id]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ip_address` to the `cashier_shifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `cashier_shifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `delivery_integrations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_order_item_id` to the `goods_receipt_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `goods_receipt_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_received` to the `goods_receipt_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `effective_date` to the `menu_prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `tables` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."cashier_shifts" DROP CONSTRAINT "cashier_shifts_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."delivery_integrations" DROP CONSTRAINT "delivery_integrations_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."goods_receipt_items" DROP CONSTRAINT "goods_receipt_items_ingredient_package_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."menus" DROP CONSTRAINT "menus_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."outlet_ingredients" DROP CONSTRAINT "outlet_ingredients_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."outlet_ingredients" DROP CONSTRAINT "outlet_ingredients_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."promotion_items" DROP CONSTRAINT "promotion_items_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."promotion_items" DROP CONSTRAINT "promotion_items_promotion_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."promotions" DROP CONSTRAINT "promotions_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."purchase_orders" DROP CONSTRAINT "purchase_orders_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."report_files" DROP CONSTRAINT "report_files_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_adjustments" DROP CONSTRAINT "stock_adjustments_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_adjustments" DROP CONSTRAINT "stock_adjustments_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_transfers" DROP CONSTRAINT "stock_transfers_from_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."stock_transfers" DROP CONSTRAINT "stock_transfers_to_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tables" DROP CONSTRAINT "tables_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."transactions" DROP CONSTRAINT "transactions_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_roles" DROP CONSTRAINT "user_roles_outlet_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."warehouse_stocks" DROP CONSTRAINT "warehouse_stocks_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."warehouse_stocks" DROP CONSTRAINT "warehouse_stocks_warehouse_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."wastes" DROP CONSTRAINT "wastes_outlet_id_fkey";

-- DropIndex
DROP INDEX "public"."user_roles_user_id_role_id_outlet_id_key";

-- AlterTable
ALTER TABLE "cashier_shifts" DROP COLUMN "outlet_id",
ADD COLUMN     "ip_address" TEXT NOT NULL,
ADD COLUMN     "place_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "delivery_integrations" DROP COLUMN "outlet_id",
ADD COLUMN     "place_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "goods_receipt_items" DROP COLUMN "ingredient_package_id",
DROP COLUMN "qty_damaged",
DROP COLUMN "qty_received",
DROP COLUMN "unit_price",
ADD COLUMN     "purchase_order_item_id" INTEGER NOT NULL,
ADD COLUMN     "unit_damaged" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "unit_id" INTEGER NOT NULL,
ADD COLUMN     "unit_received" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "ingredient_packages" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "ingredients" DROP COLUMN "cost";

-- AlterTable
ALTER TABLE "menu_prices" DROP COLUMN "valid_from",
ADD COLUMN     "effective_date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "menus" DROP COLUMN "category",
DROP COLUMN "outlet_id",
ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "place_id" INTEGER;

-- AlterTable
ALTER TABLE "promotions" DROP COLUMN "discount_type",
DROP COLUMN "discount_value",
DROP COLUMN "outlet_id",
DROP COLUMN "type",
ADD COLUMN     "place_id" INTEGER;

-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "outlet_id",
ADD COLUMN     "note" TEXT,
ADD COLUMN     "place_id" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "report_files" DROP COLUMN "outlet_id",
ADD COLUMN     "place_id" INTEGER;

-- AlterTable
ALTER TABLE "stock_transfers" DROP COLUMN "from_outlet_id",
DROP COLUMN "to_outlet_id",
ADD COLUMN     "from_place_id" INTEGER,
ADD COLUMN     "to_place_id" INTEGER;

-- AlterTable
ALTER TABLE "tables" DROP COLUMN "outlet_id",
ADD COLUMN     "place_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "outlet_id",
ADD COLUMN     "place_id" INTEGER;

-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "outlet_id",
ADD COLUMN     "place_id" INTEGER;

-- AlterTable
ALTER TABLE "wastes" DROP COLUMN "outlet_id",
ADD COLUMN     "place_id" INTEGER;

-- DropTable
DROP TABLE "public"."outlet_ingredients";

-- DropTable
DROP TABLE "public"."outlets";

-- DropTable
DROP TABLE "public"."promotion_items";

-- DropTable
DROP TABLE "public"."stock_adjustments";

-- DropTable
DROP TABLE "public"."warehouse_stocks";

-- DropTable
DROP TABLE "public"."warehouses";

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "logo_path" TEXT,
    "type" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_stocks" (
    "id" SERIAL NOT NULL,
    "place_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "qty" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "unit_id" INTEGER NOT NULL,

    CONSTRAINT "place_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_variant_items" (
    "id" SERIAL NOT NULL,
    "menu_variant_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "additional_price" DECIMAL(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT "menu_variant_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_stock_daily" (
    "id" SERIAL NOT NULL,
    "place_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "opening_qty" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "closing_qty" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "diff_qty" DECIMAL(12,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_stock_daily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "place_stocks_place_id_ingredient_id_unit_id_key" ON "place_stocks"("place_id", "ingredient_id", "unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_stock_daily_place_id_ingredient_id_date_key" ON "inventory_stock_daily"("place_id", "ingredient_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_user_id_role_id_place_id_key" ON "user_roles"("user_id", "role_id", "place_id");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_stocks" ADD CONSTRAINT "place_stocks_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_stocks" ADD CONSTRAINT "place_stocks_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_stocks" ADD CONSTRAINT "place_stocks_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cashier_shifts" ADD CONSTRAINT "cashier_shifts_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_variant_items" ADD CONSTRAINT "menu_variant_items_menu_variant_id_fkey" FOREIGN KEY ("menu_variant_id") REFERENCES "menu_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "goods_receipt_items_purchase_order_item_id_fkey" FOREIGN KEY ("purchase_order_item_id") REFERENCES "purchase_order_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_receipt_items" ADD CONSTRAINT "goods_receipt_items_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transfers" ADD CONSTRAINT "stock_transfers_from_place_id_fkey" FOREIGN KEY ("from_place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transfers" ADD CONSTRAINT "stock_transfers_to_place_id_fkey" FOREIGN KEY ("to_place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wastes" ADD CONSTRAINT "wastes_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_stock_daily" ADD CONSTRAINT "inventory_stock_daily_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_stock_daily" ADD CONSTRAINT "inventory_stock_daily_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_files" ADD CONSTRAINT "report_files_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_integrations" ADD CONSTRAINT "delivery_integrations_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
